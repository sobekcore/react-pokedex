import { useState, useEffect } from "react";
import { Pagination } from "services/enums";
import { translate } from "services/translate";

/**
 * @var {number} itemsOnPage Number of items shown on each page
 */
 let itemsOnPage = 20;

/**
 * @var {number} pagesOnSides Number of pages to show on each side of the current page
 */
let pagesOnSides = 1;

/**
 * @var {number} firstPage First pagination page
 */
let firstPage = 1;

/**
 * @var {number} lastPage Last pagination page
 */
let lastPage = firstPage;

/**
 * @param {number} props.count
 * @param {Function} props.onPageChange
 * @param {number} props.initialPage
 * @param {number} props.itemsOnPage
 * @param {number} props.pagesOnSides
 * @returns {JSX.Element}
 */
const PaginationComponent = (props) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(firstPage);

  useEffect(() => {
    if (props.initialPage) {
      setCurrentPage(props.initialPage);
    }

    if (props.itemsOnPage) {
      itemsOnPage = props.itemsOnPage;
    }

    if (props.pagesOnSides) {
      pagesOnSides = props.pagesOnSides;
    }

    const numberOfPages = Math.ceil(props.count / itemsOnPage);
    const arrayOfPages = Array.from({ length: numberOfPages }, (page, index) => ++index);

    lastPage = arrayOfPages.length;
    setPages(arrayOfPages);
  }, [props]);

  const changeCurrentPage = (page) => {
    if (currentPage !== page && page >= firstPage && page <= lastPage) {
      setCurrentPage(page);
      props.onPageChange(page);
    }
  };

  const determinePaginationElementType = (page) => {
    const CURRENT_PAGE = 1;

    let pageToCompare = currentPage;
    const sidesAndCurrent = pagesOnSides + CURRENT_PAGE;

    if (pageToCompare < firstPage + pagesOnSides + CURRENT_PAGE) {
      pageToCompare = firstPage + pagesOnSides + CURRENT_PAGE
    }

    if (pageToCompare > lastPage - pagesOnSides - CURRENT_PAGE) {
      pageToCompare = lastPage - pagesOnSides - CURRENT_PAGE;
    }

    if (page === firstPage || page === lastPage) {
      return Pagination.TYPE_ELEMENT_FIRST_LAST;
    }

    if (page === pageToCompare - sidesAndCurrent || page === pageToCompare + sidesAndCurrent) {
      return Pagination.TYPE_ELEMENT_ELLIPSIS;
    }

    if (page >= pageToCompare - pagesOnSides && page <= pageToCompare + pagesOnSides) {
      return Pagination.TYPE_ELEMENT_DEFAULT;
    }
  };

  const generatePaginationElement = (page, type) => {
    const linkClassName = page === currentPage
      ? "pagination-link is-current"
      : "pagination-link";

    switch (type) {
      case Pagination.TYPE_ELEMENT_FIRST_LAST:
        return (
          <li key={page}>
            <a className={linkClassName} onClick={() => changeCurrentPage(page)}>
              {page}
            </a>
          </li>
        );

      case Pagination.TYPE_ELEMENT_ELLIPSIS:
        return (
          <li key={page}>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
        );

      case Pagination.TYPE_ELEMENT_DEFAULT:
        return (
          <li key={page}>
            <a className={linkClassName} onClick={() => changeCurrentPage(page)}>
              {page}
            </a>
          </li>
        );
    }
  };

  return (
    <section className="is-sticky-bottom">
      <div className="p-3 has-background-white">
        <nav className="pagination" role="navigation">
          <a className="pagination-previous" onClick={() => changeCurrentPage(currentPage - 1)}>
            {translate("Previous")}
          </a>
          <a className="pagination-next" onClick={() => changeCurrentPage(currentPage + 1)}>
            {translate("Next page")}
          </a>
          <ul className="pagination-list">
            {pages && (
              <>
                {pages.map((page) => {
                  const type = determinePaginationElementType(page);
                  return generatePaginationElement(page, type);
                })}
              </>
            )}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default PaginationComponent;
