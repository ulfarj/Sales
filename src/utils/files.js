import fileSaver from 'file-saver';

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
  
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

export function fileUrl(base64File) {
    const file = base64File.replace('data:application/pdf;base64,', '');
    var blob = b64toBlob(file, 'application/pdf');    
    var blobUrl = URL.createObjectURL(blob);
    return blobUrl;
}

export function downloadFileFromBase64(file) {
    const blob = b64toBlob(file.replace('data:application/pdf;base64,', ''), 'application/pdf');
    fileSaver.saveAs(blob, 'Samningur');
}  