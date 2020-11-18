function init() {
    if (this.name) {
        console.log(this.name)
    } else {
        throw new Error('no this name')
    }
}
