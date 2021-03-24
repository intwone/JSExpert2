import chalk from 'chalk'
import chalkTable from 'chalk-table'

export default class TableConsoleComponent {
  render(data) {
    const colums = this.prepareData(data)

    const options = {
      leftPad: 2,
      colums: colums
    }

    const table = chalkTable(options, data)

    console.log(table);
  }

  prepareData(data) {
    const [firstItem] = data
    const header = Object.keys(firstItem)

    const formatHeader = (data, index) => index % 2 === 0 
      ? chalk.red(data)
      : chalk.green(data);

    

    const colums = header.map((item, index) => ({
      field: item,
      name: formatHeader(item, index)
    }))

    return colums
  }
}