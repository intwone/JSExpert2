export default class TableWebComponent {
  render(data) {
    const htmlTemplate = this.prepareData(data)

    document.body.insertAdjacentHTML('afterBegin', htmlTemplate)
  }

  prepareData(data) {
    const [ firstItem ] = data

    const jointLists = list => list.join('')

    const tHeaders = Object.keys(firstItem)
      .map(text => `<th scope=col>${text}</th>`)

    const tBody = data
      .map(item => Object.values(item))
      .map(item => item.map(value => `<td>${value}</td>`))
      .map(tds => `<tr>${jointLists(tds)}</tr>`)

    const template = `
      <table class="table table-dark table-hover table-bordered">
        <thead>
          ${jointLists(tHeaders)}
        </thead>
        <tbody>
          ${jointLists(tBody)}
        </tbody>
      </table>
    `

    return template
  }
}