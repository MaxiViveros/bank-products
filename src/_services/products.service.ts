import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../projects/products/src/app/form/form.component";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getApiUrl: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'
  postApiUrl: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'
  verifyIdApiUrl: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products/verification?id='
  putApiUrl: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';
  deleteApiUrl: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products?id='

  getProducts(authorId: string): Observable<any> {
    const headers = new HttpHeaders().set('authorId', authorId);
    return this.http.get(this.getApiUrl, {headers});
  }

  postProduct(newProduct: Product, authorId: string): Observable<any> {
    const headers = new HttpHeaders().set('authorId', authorId);
    return this.http.post(this.postApiUrl, newProduct, {headers});
  }

  verifyId(idToVerify: string): Observable<any> {
    return this.http.get(this.verifyIdApiUrl + idToVerify);
  }

  putProduct(newProduct: Product, authorId: string): Observable<any> {
    const headers = new HttpHeaders().set('authorId', authorId);
    return this.http.put(this.putApiUrl, newProduct, {headers});
  }

  deleteProduct(productToDeleteId: string, authorId: string) {
    return this.http.delete(this.deleteApiUrl + productToDeleteId, {headers: {'authorId': authorId}})
  }
}
