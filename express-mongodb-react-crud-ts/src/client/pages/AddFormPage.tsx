import * as todoService from "../services/todo-service";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { useAlertStore } from '../hooks/alert-store';

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

  const { showAlert, hideAlert } = useAlertStore();

  const [task, setTask] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    todoService.create(task)
      .then(({ status }) => {
        if (status === 201) {
          showAlert(intl.formatMessage({ id: "dataIsSaved" }, { task }))
          navigate("/", { replace: true });
        }
      }).catch((error: any) => {
        console.log(error);

        if (error.response?.data?.errorMaxData) {
          showAlert(intl.formatMessage({ id: error.response.data.errorMaxData }), "danger");
        } else if (error.response?.data?.length > 0) {
          const errorValidations = error.response?.data as ErrorValidation[];
          if (errorValidations[0]) {
            showAlert(intl.formatMessage({ id: errorValidations[0].message }), "danger");
          }
        } else {
          showAlert(error.message, "danger");
        }

      });

    setTask('');
  };

  useEffect(() => {
    hideAlert();
  }, [])

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
