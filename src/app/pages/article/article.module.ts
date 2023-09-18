import { NgModule } from "@angular/core";
import { ArticleRoutingModule } from "./article-routing.module";
import { ArticleComponent } from "./article.component";
import { CreateOrEditArticleComponent } from "./create-or-edit-article.component";
import { TableModule } from "primeng/table";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DropdownModule } from "primeng/dropdown";
import { UtilsModule } from "../../shared/utils.module";
import { PaginatorModule } from "primeng/paginator";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ArticleRoutingModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    UtilsModule,
  ],
  exports: [],
  declarations: [ArticleComponent, CreateOrEditArticleComponent],
  providers: [],
})
export class ArticleModule {}
