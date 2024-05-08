import { cyan } from 'kolorist'
import prompts from 'prompts'

async function main() {

  let answers: prompts.Answers<'name'>

  try {
    answers = await prompts([
      {
        type: 'text',
        name: 'name',
        message: 'What is your name:',
        initial: 'Abed Al Ghani'
      }
    ])

    console.log(`Hello ${cyan(answers.name)}`)
    
  } catch (error) {
    console.log(error)
  }
}

main()
