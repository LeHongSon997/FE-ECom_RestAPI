import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryMemuComponent } from './product-category-memu.component';

describe('ProductCategoryMemuComponent', () => {
  let component: ProductCategoryMemuComponent;
  let fixture: ComponentFixture<ProductCategoryMemuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryMemuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryMemuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
