Advertisements project
===================================

1.  start server ad_app_server => run AdServerApplication (port 8080)

2.  start client ad_app_client => run script npm start (port 3000)

==================================

End points:

1. PUT http://localhost:4000/ads
   Update the advertisement.
   Params: advertisement – changed advertisement
   Returns: message of the result.

2. POST http://localhost:4000/ads/add
   Add new advertisement.
   Params: advertisement – new advertisement
   Returns: message of the result.

3. GET http://localhost:4000/ads/all
   Getting all advertisements.
   Returns: the list of advertisements

4. GET http://localhost:4000/ads/category/{{category}}
   Getting all advertisements by the given category.
   Params: category – category of the item
   Returns: the list of advertisements under the given price.

5. GET http://localhost:4000/ads/price/{{maxPrice}}
   Getting all advertisements under the given price.
   Params: maxPrice – max price
   Returns: the list of advertisements under the given price.

6. GET http://localhost:4000/ads/{{id}}
   Getting advertisement by id.
   Params: id – positive value [100,000,000 - 999,999,999]
   Returns: advertisement with the given id or NULL if there is no such id.

7. DELETE http://localhost:4000/ads/{{id}}
   Remove advertisement by given id.
   Params: id – positive value [100,000,000 - 999,999,999]
   Returns: message of the result.
