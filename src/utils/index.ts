// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IChekcCindition{
  // 以何种格式进行上传格式验证
  format?: string[];
  size?: number;
}

type ErrorType = 'size' | 'format' | null
/**
 * beforeUploadCheck
 * 验证大小规则
 * file 文件
 * condition 验证规则
 * **/
export function beforeUploadCheck (file: File, condition: IChekcCindition) {
  const { format, size } = condition
  // 图片格式
  const isValidFormat = format ? format.includes(file.type) : true
  // 图片大小
  const isValidSize = size ? file.size / 1024 / 1024 < size : true

  let error: ErrorType = null

  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    isValid: isValidSize && isValidFormat,
    error
  }
}
