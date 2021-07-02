CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table nota_fiscal(
	id uuid not null primary key default uuid_generate_v4(),
	"idProduto" int not null,
	cpf text not null,
	status varchar(15) default 'Ativo',
	"dataVenda" timestamp not null,
	"dataCadastro" timestamp not null default now(),
	"dataAtualizacao" timestamp null
);

alter table nota_fiscal 
   add constraint fk_idProduto
   foreign key ("idProduto") 
   references produto(id);