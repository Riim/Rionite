import namePattern from './namePattern';
export default `(?:${ namePattern }|\\d+)(?:\\.(?:${ namePattern }|\\d+))*`;
