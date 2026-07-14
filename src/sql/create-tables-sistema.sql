--Descomentar esta línea para crear la base de datos
--create database sistema;

-- tipo de dato definido por el usuario(desarrollador)
CREATE DOMAIN codigo AS varchar(15);

--Tablas sin llave foránea

create table menu(
  id_menu codigo PRIMARY KEY,
  nombre varchar(50),
  ruta varchar(200)
);

create table rol(
  id_rol	codigo PRIMARY KEY,
  nombre	varchar(50)
);

create table usuario(
  id_usuario	codigo PRIMARY KEY,
  clave	varchar(60),
  nombre	varchar(50),
  apellido1	varchar(50),
  apellido2	varchar(50),
  email	varchar(50),
  estado	char(1)
  constraint ch_estado_usu CHECK (estado in ('V','N','B') );
);

create table instrumento(
  id_instrumento	codigo PRIMARY KEY,
  nombre	varchar(50),
  tipo_mercado char(1)
  constraint chk_mercado check(tipo_mercado in ('F','V'));
);

create table emisor(
  id_emisor	codigo PRIMARY KEY,
  razon_social	varchar(100),
  nombre	varchar(100)
);

create table fondo(
  id_fondo	codigo PRIMARY KEY,
  nombre	varchar(50),
  vigente	char(1)
);

--- tablas con llave foranea
create table usuario_rol(
  id_usuario	codigo,
  id_rol	codigo,
  constraint fk_usu foreign key  (id_usuario) references usuario(id_usuario),
  constraint fk_rol foreign key (id_rol)  references rol(id_rol),
  primary key (id_usuario,id_rol)
);

create table rol_menu(
  id_rol	codigo,
  id_menu   codigo,
  constraint fk_rol foreign key  (id_rol) references rol(id_rol),
  constraint fk_menu foreign key (id_menu)  references menu(id_menu),
  primary key (id_rol,id_menu)
);

create table nemotecnico(
  id_nemotecnico	varchar(50) primary key,
  id_instrumento	codigo,
  id_emisor	codigo,
  fecha_emision	date,
  fecha_vencimiento	date,
  constraint fk_ins foreign key  (id_instrumento) references instrumento(id_instrumento),
  constraint fk_emi foreign key (id_emisor)  references emisor(id_emisor)
);

create table cartera(
  id_fondo	codigo,
  fecha	date,
  id_nemotecnico	varchar(50),
  cantidad	numeric(18,4),
  precio	numeric(18,4),
  valor_presente	numeric(18,4),
  constraint fk_fondo foreign key (id_fondo)  references fondo(id_fondo),
  constraint fk_nemotecnico foreign key (id_nemotecnico)  references nemotecnico(id_nemotecnico),
  primary key (id_fondo,fecha,id_nemotecnico)  
);

create table operacion(
  id_operacion	int SERIAL PRIMARY KEY,
  id_fondo	codigo,
  id_usuario  codigo,
  tipo	char(1),
  fecha	date,
  monto	numeric(18,4),
  constraint fk_fondoOperacion foreign key (id_fondo)  references fondo(id_fondo),
  constraint fk_usuarioOperacion foreign key (id_usuario) references usuario(id_usuario)
);

create table operacion_detalle(
  id_operacion	int,
  correlativo	int,
  id_nemotecnico	varchar(50),
  cantidad	numeric(18,4),
  precio	numeric(18,4),
  constraint fk_oper foreign key (id_operacion)  references operacion(id_operacion),
  constraint fk_oper_nemo foreign key (id_nemotecnico)  references nemotecnico(id_nemotecnico),
  primary key (id_operacion,correlativo)  
);

create table precio_mercado(
  fecha	date,
  id_nemotecnico	varchar(50),
  precio	numeric(18,4),
  constraint fk_nemotecnico foreign key (id_nemotecnico)  references nemotecnico(id_nemotecnico),
  primary key (fecha,id_nemotecnico)  
);