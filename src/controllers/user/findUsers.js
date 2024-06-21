const prisma = require('../../core/databases/prisma')

const findUsers = async (rea, res) => {
   try {
      
      const users = await prisma.user.findMany({
         
      })
      
      return res.status(200).json(users)
      
   } catch (error) {
      return res.status(500).json({
         message: 'Não foi possível obter os usuários'
      })
   }
}

module.exports = {
   findUsers
}