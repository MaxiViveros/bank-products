import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProductsService} from "../../../../../src/_services/products.service";
import {Product} from "../form/form.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  searchTerm: string = '';
  tableData: Product[] = [];
  filteredData: Product[] = this.tableData;
  elementsToShow: number = 10;
  productSelected: Product = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: ''
  };

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  navigateToNewForm() {
    this.router.navigate(['/products/form']);
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.tableData.filter(item => {
      return (
        item.name.toLowerCase().includes(this.searchTerm) ||
        item.description.toLowerCase().includes(this.searchTerm) ||
        item.date_release.toLowerCase().includes(this.searchTerm) ||
        item.date_revision.toLowerCase().includes(this.searchTerm)
      );
    });
  }

  onShowElementsChange(event: Event) {
    this.elementsToShow = +(event.target as HTMLSelectElement).value;
    if (this.filteredData.length > this.elementsToShow) {
      this.filteredData = this.filteredData.slice(0, this.elementsToShow);
    } else {
      this.filteredData = this.tableData;
    }
  }

  private getProducts() {
    this.productsService.getProducts(String(1)).subscribe((res: any) => {
      this.filteredData = res;
      this.tableData = res;
      this.formatDate();
    });
  }

  formatDate() {
    for (let product of this.filteredData) {
      product.date_release = this.setFormat(new Date(product.date_release));
      product.date_revision = this.setFormat(new Date(product.date_revision));
    }
  }

  setFormat(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  }

  onOptionSelected(event: any, product: Product) {
    this.productSelected = product;
    let action = event.target.value;
    if (action === 'edit') {
      this.router.navigate([`/products/form/${product.id}`]);
    } else if (action === 'delete') {
      this.openDialog();
    }
  }

  openDialog() {
    const dialog = document.getElementById('confirmationDialog');
    // @ts-ignore
    dialog.style.display = 'flex';
  }

  confirmDelete() {
    this.productsService.deleteProduct(this.productSelected.id, String(1)).subscribe((res: any) => {
      this.closeDialog();
      this.getProducts();
    });
  }

  closeDialog() {
    const dialog = document.getElementById('confirmationDialog');
    // @ts-ignore
    dialog.style.display = 'none';
  }

}
