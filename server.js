require('./server/config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');

const { mongoose } = require('./server/db/mongoose');

const { agricultorRouter } = require('./server/routes/agricultorRouter');
const { anuncioRouter } = require('./server/routes/anuncioRouter');
const { banimentoRouter } = require('./server/routes/banimentoRouter');
const { cidadeRouter } = require('./server/routes/cidadeRouter');
const { comentarioRouter } = require('./server/routes/comentarioRouter');
const { configuracaoUsuarioRouter } = require('./server/routes/configuracaoUsuarioRouter');
const { culturaRouter } = require('./server/routes/culturaRouter');
const { denunciaAnuncioRouter } = require('./server/routes/denunciaAnuncioRouter');
const { denunciaPostagemRouter } = require('./server/routes/denunciaPostagemRouter');
const { empresaRouter } = require('./server/routes/empresaRouter');
const { entropiaAnuncioRouter } = require('./server/routes/entropiaAnuncioRouter');
const { estadoRouter } = require('./server/routes/estadoRouter');
const { ferramentasAgricolasRouter } = require('./server/routes/ferramentasAgricolasRouter');
const { gerenteRouter } = require('./server/routes/gerenteRouter');
const { imagemRouter } = require('./server/routes/imagemRouter');
const { moderadorRouter } = require('./server/routes/moderadorRouter');
const { motivoRouter } = require('./server/routes/motivoRouter');
const { notificacaoRouter } = require('./server/routes/notificacaoRouter');
const { planoAnuncioRouter } = require('./server/routes/planoAnuncioRouter');
const { postagemRouter } = require('./server/routes/postagemRouter');
const { tipoPostagemRouter } = require('./server/routes/tipoPostagemRouter');
const { authAdminsRouter } = require('./server/routes/authAdminsRouter');

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
app.use('/authAdmins', authAdminsRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server listen on port ${process.env.PORT}`);
});
