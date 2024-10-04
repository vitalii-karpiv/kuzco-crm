import PropTypes from 'prop-types';

export default function DateView({dateStr}) {
    if (!dateStr) {
        return <div>-</div>
    }
    const date = new Date(dateStr);

    const addZero = (num) => {
        return num < 10 ? `0${num}` : num;
    }

    return <span>{date.getFullYear()}-{addZero(date.getMonth())}-{addZero(date.getDate())}</span>
}

DateView.propTypes = {
    dateStr: PropTypes.string, // string representation of a date
}
