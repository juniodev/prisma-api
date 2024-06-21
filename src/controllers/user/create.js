const {
  z
} = require('zod')
const prisma = require('../../core/databases/prisma')

const validation = z.object({
  name: z.string({
     required_error: 'name is required'
  }),
  email: z.string({
     required_error: 'email is required'
  }).email(),
  password: z.string({
     required_error: 'password is required'
  }).min(6),
  profile_icon: z.string({
     required_error: 'profile_icon is required'
  }).url('profile_icon inválido url'),
  dateBirth: z.string({
     required_error: 'dateBirth is required'
  })
})

const createUser = async (req, res) => {
  try {

    const body = await validation.parseAsync(req.body)
    
    const exists= await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })
    
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Email já possuí um cadastro em nosso sistema'
      })
    }

    const user = await prisma.user.create({
      data: {
        ...body
      }
    })

    return res.status(201).json({
      success: true,
      user
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        sucess: false,
        message: error.issues[0].message
      })
    }
    return res.status(500).json({
      sucess: false,
      message: 'Ocorreu um error desconhecido'
    })
  }
}

module.exports = {
  createUser
}