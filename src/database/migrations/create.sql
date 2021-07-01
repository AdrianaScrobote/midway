create table produto(
	id int primary key unique,
	nome text,
	valor numeric(8,2),
	estoque int not null,
	tamanho text not null,
	tipo text not null,
	descricao text not null,
	"dataCadastro" TIMESTAMP NOT NULL DEFAULT now(),
	"dataAtualizacao" timestamp null
);

insert into produto (id, nome, valor, estoque, tamanho, tipo, descricao, "dataCadastro")
values (1, 'Calça', 100, 5, 'M', 'Jeans', 'Calça Jeans', '2021-06-20T20:32:36.931Z');


insert into produto (id, nome, valor, estoque, tamanho, tipo, descricao, "dataCadastro")
values (3, 'Calça', 100, 3, 'm', 'Jeans', 'Calça Jeans m', '2021-06-21T18:42:56.931Z');