const PATTERN = /(?<=<img[^<]+?src=\")[^\"]+/g

export default text => text.match(PATTERN)
