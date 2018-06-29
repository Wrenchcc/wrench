export default class Registry {
  constructor() {
    this.containers = {}
    this.children = {}

    // Unique key for children of a gateway
    this.currentId = 0
  }

  renderContainer(name) {
    if (!this.containers[name] || !this.children[name]) {
      return
    }

    this.containers[name].setState({
      children: Object.keys(this.children[name])
        .sort()
        .map(id => this.children[name][id]),
    })
  }

  addContainer(name, container) {
    this.containers[name] = container
    this.renderContainer(name)
  }

  removeContainer(name) {
    this.containers[name] = null
  }

  addChild(name, gatewayId, child) {
    this.children[name][gatewayId] = child
    this.renderContainer(name)
  }

  clearChild(name, gatewayId) {
    delete this.children[name][gatewayId]
  }

  register(name, child) {
    this.children[name] = this.children[name] || {}

    const gatewayId = `${name}_${this.currentId}`
    this.children[name][gatewayId] = child
    this.currentId += 1

    return gatewayId
  }

  unregister(name, gatewayId) {
    this.clearChild(name, gatewayId)
    this.renderContainer(name)
  }
}
