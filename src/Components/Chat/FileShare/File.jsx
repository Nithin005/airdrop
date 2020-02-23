export let bufferArrayuni = []

//FIXME: and TODO: This file is for generating chunks based on the file provided!!.

let er = window.location.search
// console.log()

let name_of_room = er.split('?chat=')

export const share_file = file_data => {
  let chunkSize = 1024 * 1024
  let fileSize = file_data.size
  let chunks = Math.ceil(file_data.size / chunkSize, chunkSize)
  let chunk = 0

  console.log('file size..', fileSize)
  console.log('chunks...', chunks)
  let data_object = {
    name:
      window.location.hash === 'init' ? name_of_room[0].split('-') : 'Friend',
    type: file_data.type,
    initial: true,
    send: chunk * chunkSize,
    chunks: chunks,
    final: false,
    time: Date.now()
  }
  bufferArrayuni = [data_object]

  while (chunk <= chunks) {
    var offset = chunk * chunkSize
    // console.log('current chunk..', chunk)
    // console.log('offset...', chunk * chunkSize)
    // console.log('file blob from offset...', offset)
    // console.log(file_data.slice(offset, offset + chunkSize))

    // peer.send(file_data.slice(offset, offset + chunkSize))
    // console.log(file_data.slice(offset, offset + chunkSize))
    let buffer = new Blob([file_data.slice(offset, offset + chunkSize)], {
      type: file_data.type
    })

    // console.log(data_object)
    let newdataObject = {
      name:
        window.location.hash === 'init' ? name_of_room[0].split('-') : 'Friend',
      type: file_data.type,
      chunk: chunk,
      send: chunk * chunkSize,
      file: buffer,
      initial: false,
      time: Date.now(),
      final: buffer.size === 0 ? true : false
    }
    bufferArrayuni = [...bufferArrayuni, newdataObject]
    chunk++
  }
}