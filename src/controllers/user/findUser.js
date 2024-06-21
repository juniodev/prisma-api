const {
   z
} = require('zod')
const prisma = require('../../core/databases/prisma')

const schema = z.object({
   id: z.string({
      required_error: 'id is required'
   })
})

const findUser = async (req, res) => {
   try {

      const {
         id
      } = await schema.parseAsync(req.params)

      const user = await prisma.user.findUnique({
         where: {
            id: id
         }
      })
      
      return res.status(200).json(user)

   } catch (error) {
      return res.status(500).json({
         message: 'Não foi possível obter o usuário'
      })
   }
}

module.exports = {
   findUser
}