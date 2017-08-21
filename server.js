require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');

const { mongoose } = require('./db/mongoose');

const { agricultorRouter } = require('./routes/agricultorRouter');
const { anuncioRouter } = require('./routes/anuncioRouter');
const { banimentoRouter } = require('./routes/banimentoRouter');
const { cidadeRouter } = require('./routes/cidadeRouter');
const { comentarioRouter } = require('./routes/comentarioRouter');
const { configuracaoUsuarioRouter } = require('./routes/configuracaoUsuarioRouter');
const { culturaRouter } = require('./routes/culturaRouter');
const { denunciaAnuncioRouter } = require('./routes/denunciaAnuncioRouter');
const { denunciaPostagemRouter } = require('./routes/denunciaPostagemRouter');
const { empresaRouter } = require('./routes/empresaRouter');
const { entropiaAnuncioRouter } = require('./routes/entropiaAnuncioRouter');
const { estadoRouter } = require('./routes/estadoRouter');
const { ferramentasAgricolasRouter } = require('./routes/ferramentasAgricolasRouter');
const { gerenteRouter } = require('./routes/gerenteRouter');
const { imagemRouter } = require('./routes/imagemRouter');
const { moderadorRouter } = require('./routes/moderadorRouter');
const { motivoRouter } = require('./routes/motivoRouter');
const { notificacaoRouter } = require('./routes/notificacaoRouter');
const { planoAnuncioRouter } = require('./routes/planoAnuncioRouter');
const { postagemRouter } = require('./routes/postagemRouter');
const { tipoPostagemRouter } = require('./routes/tipoPostagemRouter');

var app = express();
app.use(bodyParser.json());


app.use('/agricultor', agricultorRouter);
app.use('/anuncio', anuncioRouter);
app.use('/banimento', banimentoRouter);
app.use('/cidade', cidadeRouter);
app.use('/comentario', comentarioRouter);
app.use('/configuracaoUsuario', configuracaoUsuarioRouter);
app.use('/cultura', culturaRouter);
app.use('/denunciaAnuncio', denunciaAnuncioRouter);
app.use('/denunciaPostagem', denunciaPostagemRouter);
app.use('/empresa', empresaRouter);
app.use('/entropiaAnuncio', entropiaAnuncioRouter);
app.use('/estado', estadoRouter);
app.use('/ferramentasAgricolas', ferramentasAgricolasRouter);
app.use('/gerente', gerenteRouter);
app.use('/imagem', imagemRouter);
app.use('/moderador', moderadorRouter);
app.use('/motivo', motivoRouter);
app.use('/notificacao', notificacaoRouter);
app.use('/planoAnuncio', planoAnuncioRouter);
app.use('/postagem', postagemRouter);
app.use('/tipoPostagem', tipoPostagemRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server listen on port ${process.env.PORT}`);
});



























