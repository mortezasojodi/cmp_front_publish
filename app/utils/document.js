// pages/api/document.js

import nextConnect from 'next-connect';
import multer from 'multer';
import cors from 'cors';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // Увеличиваем максимальный размер файла до 50 MB
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(cors());

apiRoute.use(upload.fields([{ name: 'BusinessLicense' }, { name: 'HealthDepartmentCertificate' }]));

apiRoute.post((req, res) => {
  const { files } = req;


  res.status(200).json({ message: 'Files uploaded successfully', files });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Отключаем встроенный bodyParser для обработки multipart/form-data
  },
};