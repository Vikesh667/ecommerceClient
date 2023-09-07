import { useDispatch, useSelector } from "react-redux";
import style from "../../../styles/Product.module.css";
import { Link } from "react-router-dom";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectBrands,
  selectCategories,
  selectTotalItems,
} from "../productSlice";
import { useEffect, useState } from "react";
import PaginationComponent from "../../../commen/PaginationComponent";
import { ITEM_PER_PAGE } from "../../../app/constent";
export function Product() {
 

  const sortOptions = [
    { name: "Best Rating", sort: "rating", order: "dsc", current: false },
    { name: "Price Low to High", sort: "price", order: "asc", current: false },
    { name: "Price High to Low", sort: "price", order: "dsc", current: false },
  ];

  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const totalItems = useSelector(selectTotalItems);
  const filters = [
    {
      id: "category",
      name: "category",
      options: categories
    },
    {
      id: "brands",
      name: "brands",
      options: brands
    },
  ];
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const handleFilter = (e, section, option) => {
    console.log(e.target.checked);
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
  };
  const handleSort = (e, option) => {
    const sort = { ...filter, _sort: option.sort, _order: option.order };
    setSort(sort);
  };
  const handlePage = (page) => {
    console.log({ page });
    setPage(page);
  };
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);
  const [show, setShow] = useState(null); // Use state to track which category is open

  const handleCategory = (categoryIndex) => {
    setShow(show === categoryIndex ? null : categoryIndex);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
useEffect(()=>{
     dispatch(fetchBrandsAsync())
     dispatch(fetchCategoriesAsync())
},[])
  return (
    <div className={style.container}>
      <div className={style.productHeading}>
        <h4>All Products</h4>
        <div className={style.dropdown}>
          <p onClick={toggleDropdown}>Sort</p>
          {isOpen && (
            <ul className={style.dropdownoptions}>
              {sortOptions.map((option, index) => (
                <li key={index} onClick={(e) => handleSort(e, option)}>
                  {option.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={style.mainContainer}>
        <div className={style.filter}>
          {filters.map((section, index) => (
            <div key={section.id} className={style.filterContent}>
              <div
                className={style.filterlabel}
                onClick={() => handleCategory(index)}
              >
                <span>{section.name}</span>
                <span>{show === index ? "-" : "+"}</span>
              </div>

              <div className={show === index ? "opened" : "closed"}>
                {show === index &&
                  section.options.map((option, optionIdx) => (
                    <div key={option.value} className={style.categories}>
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => handleFilter(e, section, option)}
                        className={style.active}
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className={style.label}
                      >
                        {option.lable}
                      </label>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
          ))}
        </div>
        <div className={style.products}>
          <div className={style.productContent}>
            <div className={style.wrapper}>
              {products.map((product) => {
                return (
                  <Link to={`/productDetails/${product.id}`} key={product.id}>
                  <div className={style.cart} >
                    <div className={style.productImage}>
                      <img src={product.thumbnail} alt={product.title} />
                    </div>
                    <div className={style.cartContent}>
                      <div className={style.title}>
                        <p>{product.title}</p>
                        <p>${product.price}</p>
                      </div>
                      <div className={style.title}>
                        <p>{product.rating}</p>
                        <p>
                          $
                          {Math.round(
                            product.price *
                              (1 - product.discountPercentage / 100)
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={style.pagination}>
        <PaginationComponent
          handlePage={handlePage}
          page={page}
          setPage={setPage}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
}
