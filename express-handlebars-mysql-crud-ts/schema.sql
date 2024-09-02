-- dev.todo definition

-- Drop table

-- DROP TABLE dev.todo;

CREATE TABLE todo (
	id VARCHAR(255) NOT NULL,
	task VARCHAR(255) NOT NULL,
	done bool NOT NULL DEFAULT false,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL,
	CONSTRAINT todo_pkey PRIMARY KEY (id),
	CONSTRAINT todo_task_key UNIQUE (task)
);

-- dev.aksara_log definition

-- Drop table

-- DROP TABLE dev.aksara_log;

CREATE TABLE aksara_log (
	id uuid NOT NULL,
	phrase VARCHAR(255) NOT NULL,
	client_ip VARCHAR(255) NOT NULL,
	user_agent VARCHAR(255) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT aksara_log_pkey PRIMARY KEY (id)
);