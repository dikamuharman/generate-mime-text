import {createMimeMessage} from 'mimetext'

export default function handler(request, response) {
  const { sender, to, subject, message, filename, byteName } = request.body;

  const [xlsx, zip] = filename;
  const [xlsxByte, zipByte] = byteName;
  const msg = createMimeMessage();
  msg.setSender(`from ${sender}`);
  msg.setTo(to);
  msg.setSubject(subject);
  msg.setMessage( 'text/plain',message);
  msg.setAttachment(xlsx,'text/plain',msg.toBase64(xlsxByte));
  msg.setAttachment(zip,'text/plain',msg.toBase64(zipByte));
  
  response.status(200).json({'raw' : msg.asRaw()});
}
