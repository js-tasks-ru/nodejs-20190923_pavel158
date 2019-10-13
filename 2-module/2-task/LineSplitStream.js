const stream = require('stream');
const os = require('os');
const {StringDecoder} = require('string_decoder');


class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this._encoding = options.encoding;
    this._decoder = new StringDecoder(this._encoding);
    this._str = '';
  }

  _transform(chunk, encoding, callback) {
    const chunkStr = this._decoder.write(chunk);
    const currentStr = `${this._str}${chunkStr}`;

    if (currentStr.includes(os.EOL)) {
      const lines = currentStr.split(os.EOL);

      lines
          .slice(0, -1)
          .forEach((line) => this.push(line));

      this._str = lines.slice(-1)[0];
    } else {
      this._str = currentStr;
    }

    callback();
  }

  _flush(callback) {
    callback(null, this._str);
  }
}

module.exports = LineSplitStream;




