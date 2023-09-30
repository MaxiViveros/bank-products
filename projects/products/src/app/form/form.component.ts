import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../../../../src/_services/products.service";
import {ActivatedRoute, Router} from "@angular/router";

export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  title: string = 'form';
  errorMessageInName: string = '';
  errorMessageInDescription: string = '';
  errorMessageInDateRelease: string = '';
  errorMessageInDateRevision: string = '';
  errorMessageInId: string = '';
  errorMessageInLogo: string = '';
  showError: boolean = false;
  newProduct: Product = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: ''
  };
  disabledEditId: boolean = false;
  editMode: boolean = false;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('id') != null) {
      this.productsService.getProducts(String(1)).subscribe((res: any) => {
        this.newProduct = res.find((product: Product) => product.id == this.activatedRoute.snapshot.paramMap.get('id'));
        this.disabledEditId = true;
        this.editMode = true;
      });
    }
  }

  backToList() {
    this.router.navigate(['/products/list']);
  }

  postProduct() {
    if (!this.verifyId(this.newProduct.id)) {
      this.productsService.postProduct(this.newProduct, String(1)).subscribe((res: any) => {
        this.backToList();
      });
    } else {
      this.showError = true;
    }
  }

  onInputIdChange(event: any) {
    let idInput = event.target.value;
    if (idInput.length < 3 || idInput.length > 10) {
      this.errorMessageInId = 'El id debe tener entre 3 y 10 caracteres'
    } else {
      this.errorMessageInId = '';
    }
  }

  verifyId(id: string): boolean {
    this.productsService.verifyId(id).subscribe((res: any) => {
      if (res) {
        this.errorMessageInId = 'El id ya existe'
      }
      return res;
    });
    return false;
  }

  cleanForm() {
    this.newProduct = {
      id: this.newProduct.id,
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: ''
    };
  }

  onInputNameChange(event: any) {
    let nameInput = event.target.value;
    if (nameInput.length < 5 || nameInput.length > 100) {
      this.errorMessageInName = 'El nombre debe tener entre 3 y 100 caracteres'
    } else {
      this.errorMessageInName = '';
    }
  }

  onDescriptionChange(event: any) {
    let nameInput = event.target.value;
    if (nameInput.length < 10 || nameInput.length > 200) {
      this.errorMessageInDescription = 'La descripción debe tener entre 10 y 200 caracteres'
    } else {
      this.errorMessageInDescription = '';
    }
  }

  onDateReleaseChange(event: any) {
    let currentDate: Date = new Date();
    let dateInput: Date = new Date(event.target.value);
    dateInput.setMinutes(dateInput.getMinutes() + dateInput.getTimezoneOffset());

    if (dateInput < currentDate) {
      this.errorMessageInDateRelease = 'La fecha de lanzamiento debe ser mayor o igual a la fecha actual'
    } else {
      this.errorMessageInDateRelease = '';
    }
  }

  onLogoChange(event: any) {
    if (this.newProduct.logo == '') {
      this.errorMessageInLogo = 'El enlace del logo es requerido'
    } else {
      this.errorMessageInLogo = '';
    }
  }

  onDateRevisionChange(event: any) {
    let currentDate: Date = new Date();
    let dateInput: Date = new Date(event.target.value);
    dateInput.setMinutes(dateInput.getMinutes() + dateInput.getTimezoneOffset());

    if (!this.isAYearLater(dateInput, currentDate)) {
      this.errorMessageInDateRevision = 'La fecha de revisión debe ser un año posterior al actual'
    } else {
      this.errorMessageInDateRevision = '';
    }
  }

  isAYearLater(dateInput: Date, currentDate: Date): boolean {
    return dateInput.getDate() == currentDate.getDate() &&
      dateInput.getMonth() == currentDate.getMonth() &&
      dateInput.getFullYear() == currentDate.getFullYear() + 1;
  }

  isFormReady() {
    return this.errorMessageInName == '' &&
      this.errorMessageInDescription == '' &&
      this.errorMessageInDateRelease == '' &&
      this.errorMessageInDateRevision == '' &&
      this.errorMessageInId == '' &&
      this.errorMessageInLogo == '' &&
      this.newProduct.id != '' &&
      this.newProduct.name != '' &&
      this.newProduct.description != '' &&
      this.newProduct.logo != '' &&
      this.newProduct.date_release != '' &&
      this.newProduct.date_revision != '';
  }

  putProduct() {
    this.productsService.putProduct(this.newProduct, String(1)).subscribe((res: any) => {
      this.backToList();
    });
  }
}
