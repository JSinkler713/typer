const snippets = [
  {
  text: `function() { console.log('hello') }`,
  meaning: 'this will log hello to standard out, the browser console, or the terminal you are working in'
  },
  {
    text: 'npm init',
    meaning: 'this will create a package.json file and allow you to configure the package'
  },
  {
    text: 'sequelize db:migrate',
    meaning: 'this will take a look at the models files you have set up, and talk to your database, it will update to have tables matching your models'
  }
]

export default snippets
