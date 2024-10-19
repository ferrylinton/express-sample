import { RequestInfo } from "@src/types/request-info";
import { getCollection } from "../utils/mongodb";
import { FindResult, Pageable, RequestParams } from "@src/types/common-type";
import { mapResult } from "../utils/json-util";
import logger from "../utils/winston";
import { WithId } from "mongodb";

const REQUEST_INFO_COLLECTION = 'request_info';

const PAGE_SIZE = 10;

const getSort = (sort: string) => {
	const result: any = {};
	const arr = sort.split(",");
	result[arr[0]] = (arr.length === 1 || arr[1] === "asc") ? 1 : -1;
	return result;
}

export const find = async ({ page, column, keyword, sort }: RequestParams) => {
	sort = sort || "createdAt,desc";
	console.log({ page, column, keyword, sort });
	const postCollection = await getCollection(REQUEST_INFO_COLLECTION);

	const pipeline = [
		{
			'$match': {}
		},
		{
			'$project': {
				'content': 0
			}
		}, {
			'$sort': getSort(sort)
		}, {
			'$facet': {
				'data': [
					{
						'$skip': (page || 0) * PAGE_SIZE
					}, {
						'$limit': PAGE_SIZE
					}
				],
				'pagination': [
					{
						'$count': 'total'
					}
				]
			}
		}, {
			'$unwind': '$pagination'
		}
	];

	if (column && keyword) {
		const regex = new RegExp(keyword, 'i');
		pipeline[0]['$match'] = {
			$and: [
				{
					columns: { "$in": [column] }
				},
				{
					'$or': [
						{ 'app': regex },
						{ 'method': regex },
						{ 'url': regex },
						{ 'ip': regex },
						{ 'userAgent': regex }
					]
				}
			]
		}

		logger.info('find : ' + JSON.stringify(pipeline).replaceAll('{}', regex.toString()));
	} else if (!column && keyword) {
		const regex = new RegExp(keyword, 'i');
		pipeline[0]['$match'] = {
			'$or': [
				{ 'app': regex },
				{ 'method': regex },
				{ 'url': regex },
				{ 'ip': regex },
				{ 'userAgent': regex }
			]
		}

		logger.info('find : ' + JSON.stringify(pipeline).replaceAll('{}', regex.toString()));
	} else if (column && !keyword) {
		pipeline[0]['$match'] = {
			columns: { "$in": [column] }
		}
		logger.info('find : ' + JSON.stringify(pipeline));
	} else {
		pipeline.shift();
		logger.info('POST.find : ' + JSON.stringify(pipeline));
	}

	const arr = await postCollection.aggregate<Pageable<WithId<RequestInfo>>>(pipeline).toArray();

	const result: Pageable<RequestInfo> = {
		data: [],
		pagination: {
			total: 0,
			totalPage: 0,
			page: 0,
			pageSize: PAGE_SIZE
		},
		sort,
		keyword,
		column
	};

	if (arr.length) {
		if (keyword) {
			result.keyword = keyword;
		}

		result.pagination.page = page || 0;
		result.pagination.totalPage = Math.ceil(arr[0].pagination.total / PAGE_SIZE)
		result.pagination.pageSize = PAGE_SIZE;

		result.data = arr[0].data.map(item => {
			return mapResult(item)
		})

		return result;
	}

	return result;
}

export const find2 = async (): Promise<FindResult<RequestInfo>> => {
	const requestInfocollection = await getCollection<Omit<RequestInfo, "id">>(REQUEST_INFO_COLLECTION);
	const list = await requestInfocollection.find().sort({ createdAt: -1 }).toArray();
	const total = await requestInfocollection.countDocuments();
	return {
		list: list.map(requestInfo => mapResult(requestInfo)),
		total
	};
};

export const create = async (requestInfo: Omit<RequestInfo, "id">) => {
	requestInfo.createdAt = (new Date()).toISOString();
	const todoCollection = await getCollection<Omit<RequestInfo, "id">>(REQUEST_INFO_COLLECTION);
	return await todoCollection.insertOne(requestInfo);
};