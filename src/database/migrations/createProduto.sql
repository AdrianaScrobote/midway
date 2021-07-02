create table produto(
	id int not null primary key unique,
	nome text not null,
	valor numeric(8,2) not null,
	estoque int not null,
	tamanho text not null,
	tipo text not null,
	descricao text not null,
	"dataCadastro" timestamp not null default now(),
	"dataAtualizacao" timestamp null
);

insert into produto (id, nome, valor, estoque, tamanho, tipo, descricao, "dataCadastro")
values (1, 'Calça', 100, 5, 'M', 'Jeans', 'Calça Jeans', '2021-06-20T20:32:36.931Z');


insert into produto (id, nome, valor, estoque, tamanho, tipo, descricao, "dataCadastro")
values (3, 'Calça', 100, 3, 'm', 'Jeans', 'Calça Jeans m', '2021-06-21T18:42:56.931Z');