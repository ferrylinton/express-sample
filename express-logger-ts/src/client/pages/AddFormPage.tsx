import React, { ChangeEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { useAlertStore } from '../hooks/alert-store';
import * as todoService from "../services/todo-service";

export interface ErrorValidation {
  code: string
  minimum: number
  type: string
  inclusive: boolean
  exact: boolean
  message: string
  path: string[]
}

export const AddFormPage = () => {

  const intl = useIntl();

  const navigate = useNavigate();

  const { alert } = useAlertStore();

  const [task, setTask] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    todoService.create(task)
      .then(({ status }) => {
        if (status === 201) {
          alert.success(intl.formatMessage({ id: "dataIsSaved" }, { task }))
          navigate("/", { replace: true });
        }
      }).catch((error: any) => {
        console.error(error);

        if (error.response?.data?.errorMaxData) {
          alert.error(intl.formatMessage({ id: error.response.data.errorMaxData }));
        } else if (error.response?.data?.length > 0) {

          const errorValidations = error.response?.data as ErrorValidation[];
          if (errorValidations[0]) {
            alert.error(intl.formatMessage({ id: errorValidations[0].message }));
          } else {
            alert.error(error.message);
          }

        } else if (error.response?.data?.code) {
          alert.error(intl.formatMessage({ id: error.response.data.code }))
        } else {
          alert.error(error.message);
        }

      });

    setTask('');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete='off'
        className="todo-form">

        <div className="form-group">
          <label><FormattedMessage id="task" /></label>
          <input
            type="text"
            placeholder={intl.formatMessage({ id: 'task' })}
            name='task'
            value={task}
            autoComplete='off'
            autoFocus
            onChange={handleChange} />
        </div>
        <section className="buttons">
          <Link to={"/"} className="btn btn-secondary">
            <FormattedMessage id="back" />
          </Link>
          <button type="submit" className="btn btn-primary">
            <FormattedMessage id="save" />
          </button>
        </section>

      </form>
    </>
  )
}
