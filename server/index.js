import 'dotenv/config';
import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.disable('x-powered-by');
app.use(express.json({limit:'100kb'}));
const port=Number(process.env.PORT)||3001;

app.get('/api/health',(_req,res)=>res.json({ok:true,configured:Boolean(process.env.GEMINI_API_KEY)}));
app.post('/api/chat',async(req,res)=>{
 const apiKey=process.env.GEMINI_API_KEY;
 if(!apiKey||apiKey==='COLE_SUA_CHAVE_AQUI'||apiKey==='COLE_SUA_CHAVE_DO_GEMINI_AQUI')return res.status(503).json({error:'Configure GEMINI_API_KEY no arquivo .env.'});
 const messages=req.body?.messages;
 if(!Array.isArray(messages)||messages.length===0||messages.length>30||messages.some(m=>!m||!['user','assistant'].includes(m.role)||typeof m.content!=='string'||m.content.length>5000))return res.status(400).json({error:'Mensagens inválidas ou muito longas.'});
 try{
  const ai=new GoogleGenAI({apiKey});
  const contents=messages.map(m=>({role:m.role==='assistant'?'model':'user',parts:[{text:m.content}]}));
  const response=await ai.models.generateContent({model:process.env.GEMINI_MODEL||'gemini-3.8-flash',contents,config:{systemInstruction:'Você é o SupportAI, um assistente virtual de atendimento. Responda em português brasileiro, de forma clara, educada e objetiva. Não invente informações sobre empresas, pedidos, preços ou prazos. Quando não souber algo, oriente o cliente a procurar a equipe responsável.'}});
  res.json({reply:response.text||'Não foi possível gerar uma resposta.'});
 }catch(error){
  const status=Number(error.status)||502;
  console.error('Erro Gemini:',status,error.message);
  if(status===429)return res.status(429).json({error:'Limite gratuito do Gemini atingido. Tente novamente mais tarde.'});
  if([400,401,403,404].includes(status))return res.status(400).json({error:'Verifique a chave, o modelo e as permissões da API Gemini.'});
  return res.status(502).json({error:'Não foi possível consultar o Gemini neste momento.'});
 }
});
app.listen(port,()=>console.log('SupportAI API em http://localhost:'+port));
