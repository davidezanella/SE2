CREATE TABLE users (
    id SERIAL not null,
    username varchar(70) not null,
    name varchar(70) not null,
    surname varchar(70) not null,
    email varchar(70) not null,
    primary key(id)
);

CREATE TYPE task_type AS ENUM ('multi_choice', 'single_choice', 'open_answer', 'true_false');

CREATE TABLE tasks (
    id SERIAL not null,
    title varchar(70) not null,
    author integer not null,
    question varchar(150) not null,
    type task_type not null,
    primary key(id),
    foreign key(author) references users(id)
);

CREATE TABLE tags(
    name varchar(70) not null,
    task_id integer not null,
    primary key(name, task_id),
    foreign key(task_id) references tasks(id)
);

CREATE TABLE task_choices(
    task_id integer not null,
    choice varchar(150) not null,
    correct boolean not null,
    primary key(choice, task_id),
    foreign key(task_id) references tasks(id)
);

CREATE TABLE answers(
    id SERIAL not null,
    user_id integer not null,
    task_id integer not null,
    submitted_at timestamp not null,
    primary key(id),
    unique(user_id, task_id),
    foreign key(user_id) references users(id),
    foreign key(task_id) references tasks(id)
);

CREATE TABLE answer_answers(
    answer_id integer not null,
    answer varchar(150) not null,
    primary key(answer_id, answer),
    foreign key(answer_id) references answers(id)
);

CREATE TYPE exam_type AS ENUM ('exam', 'random_exam', 'crowdsourcing');

CREATE TABLE exams(
    id SERIAL not null,
    name varchar(80) not null,
    author integer not null,
    created_at timestamp not null,
    start_time timestamp not null,
    end_time timestamp,
    duration interval,
    review_deadline timestamp not null,
    modality exam_type not null,
    primary key(id),
    foreign key(author) references users(id)
);

CREATE TABLE exam_students(
    exam_id integer not null,
    student_id integer not null,
    primary key(exam_id, student_id),
    foreign key(exam_id) references exams(id),
    foreign key(student_id) references users(id)
);

CREATE TABLE exam_tas(
    exam_id integer not null,
    ta_id integer not null,
    primary key(exam_id, ta_id),
    foreign key(exam_id) references exams(id),
    foreign key(ta_id) references users(id)
);

CREATE TABLE exam_tasks(
    exam_id integer not null,
    task_id integer not null,
    primary key(exam_id, task_id),
    foreign key(exam_id) references exams(id),
    foreign key(task_id) references tasks(id)
);

CREATE TABLE raffle(
    exam_id integer not null,
    tag varchar(70) not null,
    number integer not null,
    primary key(exam_id, tag),
    foreign key(exam_id) references exams(id)
    /*foreign key(tag) references tags(name)*/
);

CREATE TABLE corrections(
    id SERIAL not null,
    answer_id integer not null,
    text varchar(200) not null,
    score integer not null,
    user_id integer not null,
    primary key(id),
    unique(answer_id, user_id),
    foreign key(answer_id) references answers(id),
    foreign key(user_id) references users(id)
);

CREATE TABLE peerCorrections(
    id SERIAL not null,
    answer_id integer not null,
    text varchar(200) not null,
    user_id integer not null,
    primary key(id),
    unique(answer_id, user_id),
    foreign key(answer_id) references answers(id),
    foreign key(user_id) references users(id)
);

CREATE TABLE taPeerCorrections(
    id SERIAL not null,
    peer_correction_id integer not null,
    answer_id integer not null,
    text varchar(200) not null,
    user_id integer not null,
    primary key(id),
    unique(peer_correction_id, user_id),
    foreign key(answer_id) references answers(id),
    foreign key(user_id) references users(id),
    foreign key(peer_correction_id) references peerCorrections(id)
);

CREATE TABLE results(
    id SERIAL not null,
    start_time timestamp not null,
    end_time timestamp not null,
    score integer not null,
    exam_id integer not null,
    user_id integer not null,
    primary key(id),
    unique(exam_id, user_id),
    foreign key(exam_id) references exams(id),
    foreign key(user_id) references users(id)
);
