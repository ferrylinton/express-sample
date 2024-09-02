-- dev.todo definition

-- Drop table

-- DROP TABLE dev.todo;

CREATE TABLE dev.todo (
	id varchar NOT NULL,
	task varchar NOT NULL,
	done bool NOT NULL DEFAULT false,
	created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NULL,
	CONSTRAINT todo_pkey PRIMARY KEY (id),
	CONSTRAINT todo_task_key UNIQUE (task)
);

-- dev.aksara_log definition

-- Drop table

-- DROP TABLE dev.aksara_log;

CREATE TABLE dev.aksara_log (
	id uuid NOT NULL,
	phrase varchar NOT NULL,
	client_ip varchar NOT NULL,
	user_agent varchar NOT NULL,
	created_at timestamptz NOT NULL,
	CONSTRAINT aksara_log_pkey PRIMARY KEY (id)
);