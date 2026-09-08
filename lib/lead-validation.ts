import { z } from "zod";
import { practitionerInterests } from "./commerce";

const email=z.string().trim().max(254).email().transform(value=>value.toLowerCase());
const shortText=z.string().trim().min(1).max(100);
const common={email,consent:z.literal(true),website:z.string().max(200).optional().default(""),source:z.string().max(100).optional().default("/")};

export const leadSchema=z.discriminatedUnion("kind",[
  z.object({...common,kind:z.literal("newsletter")}),
  z.object({...common,kind:z.literal("practitioner"),name:shortText,business:z.string().trim().min(1).max(150),profession:shortText,country:shortText,interest:z.enum(practitionerInterests),message:z.string().trim().min(1).max(3000)}),
]);

export async function readLeadBody(request: Request) {
  if(!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) throw new Error("content-type");
  if(!request.body) throw new Error("empty-body");
  const reader=request.body.getReader(),chunks:Uint8Array[]=[];
  let size=0;
  try{
    while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>16384){await reader.cancel();throw new Error("too-large");}chunks.push(value);}
  }finally{reader.releaseLock();}
  const body=new Uint8Array(size);let offset=0;for(const chunk of chunks){body.set(chunk,offset);offset+=chunk.byteLength;}
  return JSON.parse(new TextDecoder("utf-8",{fatal:true}).decode(body));
}
