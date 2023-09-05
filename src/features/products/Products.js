import { useDispatch, useSelector } from "react-redux";
import style from "../../styles/Product.module.css";
import {
  fetchProductAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
} from "./productSlice";
import { useEffect, useState } from "react";
import PaginationComponent from "../../commen/PaginationComponent";

export function Product() {
  const filters = [
    {
      id: "category",
      name: "category",
      options: [
        { value: "smartphones", lable: "smartphones", checked: false },
        { value: "laptops", lable: "laptops", checked: false },
        { value: "fragrances", lable: "fragrances", checked: false },
        { value: "skincare", lable: "skincare", checked: false },
        { value: "groceries", lable: "groceries", checked: false },
        { value: "home-decoration", lable: "home decoration", checked: false },
      ],
    },
    {
      id: "brands",
      name: "brands",
      options: [
        { value: "Apple", lable: "Apple", checked: false },
        { value: "Samsung", lable: "Samsung", checked: false },
        { value: "OPPO", lable: "OPPO", checked: false },
        { value: "Huawei", lable: "Huawei", checked: false },
        {
          value: "Microsoft Surface",
          lable: "Microsoft Surface",
          checked: false,
        },
        { value: "Infinix", lable: "Infinix", checked: false },
        { value: "HP Pavilion", lable: "HP Pavilion", checked: false },
        {
          value: "Impression of Acqua Di Gio",
          lable: "Impression of Acqua Di Gio",
          checked: false,
        },
        { value: "Royal_Mirage", lable: "Royal_Mirage", checked: false },
        {
          value: "Fog Scent Xpressio",
          lable: "Fog Scent Xpressio",
          checked: false,
        },
        { value: "Al Munakh", lable: "Al Munakh", checked: false },
        {
          value: "Lord - Al-Rehab",
          lable: "Lord   Al Rehab",
          checked: false,
        },
        { value: "L'Oreal Paris", lable: "L'Oreal Paris", checked: false },
        { value: "Hemani Tea", lable: "Hemani Tea", checked: false },
        { value: "Dermive", lable: "Dermive", checked: false },
        {
          value: "ROREC White Rice",
          lable: "ROREC White Rice",
          checked: false,
        },
        { value: "Fair & Clear", lable: "Fair & Clear", checked: false },
        { value: "Saaf & Khaas", lable: "Saaf & Khaas", checked: false },
        {
          value: "Bake Parlor Big",
          lable: "Bake Parlor Big",
          checked: false,
        },
        {
          value: "Baking Food Items",
          lable: "Baking Food Items",
          checked: false,
        },
        { value: "fauji", lable: "fauji", checked: false },
        { value: "Dry Rose", lable: "Dry Rose", checked: false },
        { value: "Boho Decor", lable: "Boho Decor", checked: false },
        { value: "Flying Wooden", lable: "Flying Wooden", checked: false },
        { value: "LED Lights", lable: "LED Lights", checked: false },
        { value: "luxury palace", lable: "luxury palace", checked: false },
        { value: "Golden", lable: "Golden", checked: false },
      ],
    },
  ];

  const sortOptions = [
    { name: "Best Rating", sort: "rating", order: "dsc", current: false },
    { name: "Price Low to High", sort: "price", order: "asc", current: false },
    { name: "Price High to Low", sort: "price", order: "dsc", current: false },
  ];
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const handleFilter = (e, section, option) => {
    console.log(e.target.checked)
    const newFilter={...filter}
    if(e.target.checked){
      newFilter[section.id]=option.value
    }
    else{
      delete newFilter[section.id]
    }
    setFilter(newFilter);
    dispatch(fetchProductsByFiltersAsync(filter));
  };
  const handleSort = (e, option) => {
    const newFilter = { ...filter, _sort: option.sort, _order: option.order };
    setFilter(newFilter);
  };
  useEffect(() => {
    dispatch(fetchProductsByFiltersAsync(filter));
  }, [dispatch,filter]);
  const [show, setShow] = useState(null); // Use state to track which category is open

  const handleCategory = (categoryIndex) => {
    setShow(show === categoryIndex ? null : categoryIndex);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => handleFilter(e, section, option)}
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
                  <div className={style.cart} key={product.id}>
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={style.pagination}>
        <PaginationComponent />
      </div>
    </div>
  );
}
