const fs = require('fs');
const path = require('path');

const dbBackup = (req, res) => {
   try {
      
      const pathFile = path.join(process.cwd(), 'prisma', 'dev.db');
      
      res.setHeader('Content-Disposition', `attachment; filename="banco.db"`)

      return res.sendFile(pathFile)

   } catch (error) {
      return res.status(500).json({
         message: 'Error ao fazer backup',
         error
      });
   }
};

module.exports = {
   dbBackup
};