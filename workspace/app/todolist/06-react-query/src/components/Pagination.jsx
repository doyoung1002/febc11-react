import PropTypes from 'prop-types';
import { Link, useSearchParams } from 'react-router-dom';

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  current: PropTypes.number,
};

function Pagination({ totalPages, current = 1 }) {
  // 페이지네이션
  let pageList = [];
  const [searchParams] = useSearchParams();
  for (let page = 1; page <= totalPages; page++) {
    searchParams.set('page', page);
    // 예시
    // keyword=황승&page=1
    // keyword=황승&page=2
    // keyword=황승&page=3
    let search = searchParams.toString();
    pageList.push(
      <li
        key={page}
        className={current === page ? 'active' : ''}
      >
        <Link to={`/list?${search}`}>{page}</Link>
      </li>
    );
  }
  return (
    <div className='pagination'>
      <ul>{pageList}</ul>
    </div>
  );
}

export default Pagination;
