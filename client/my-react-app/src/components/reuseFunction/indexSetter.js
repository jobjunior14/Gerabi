export default function indexSetter (array) {

    return array.map((el, index) => {return {...el, index}});
}