import PropTypes from 'prop-types';

export default function NumberRenderer({amount}) {

    const amountString = String(amount);

    const hryvnia = amountString.slice(0, -2);
    const kopiyka = amountString.slice(amountString.length - 2);

    return <span>{hryvnia}.{kopiyka}</span>
}

NumberRenderer.propTypes = {
    amount: PropTypes.number,
}
