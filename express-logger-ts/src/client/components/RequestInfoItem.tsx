import { RequestInfo } from '@src/types/request-info';
import { FormattedDate, useIntl } from 'react-intl';

type Props = {
    index: number
    reqestInfo : RequestInfo
}

export const RequestInfoItem = ({index, reqestInfo} : Props) => {

    const intl = useIntl();

  return (
    <tr>
        <td data-label="#">{index}</td>
        <td data-label={intl.formatMessage({id : "createdAt"})}><FormattedDate value={new Date(reqestInfo.createdAt)} /></td>
        <td data-label={intl.formatMessage({id : "app"})}>{reqestInfo.app}</td>
        <td data-label={intl.formatMessage({id : "ip"})}>{reqestInfo.ip}</td>
    </tr>
  )
}
