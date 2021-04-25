import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesServiceService } from '../services/countries-service.service';

@Component({
    selector: 'app-addcountry',
    templateUrl: './addcountry.component.html',
    styleUrls: ['./addcountry.component.css']
})
export class AddcountryComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    image: any = null;
    imagePath: string = null;
    rankExisted: boolean = false
    imageName: string = "Choose file"

    constructor(private formBuilder: FormBuilder,
        private apiService: CountriesServiceService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$"), Validators.minLength(3), Validators.maxLength(20)]],
            rank: ['', Validators.required],
            image: ['', [Validators.required]]
        });
    }

    get f() { return this.registerForm.controls; }

    async selectImage(event) {
        if (event.target.files.length > 0) {
            this.image = event.target.files[0]
            this.imageName = this.image.name
            const formData = new FormData();
            formData.append('file', this.image);
            let response = await this.apiService.checkImage(formData)
            // console.log(response);
            if (response['status']) {
                this.imagePath = response['data']['filePath']
            }
        }
    }

    async checkImamgeRank(event) {
        console.log(event.target.value);
        if (event.target.value && event.target.value != "") {
            let response = await this.apiService.checkExistingRank(event.target.value)
            // console.log(response);
            this.rankExisted = response['status']
        }
        else {
            this.rankExisted = !this.rankExisted
        }
    }

    async onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) { return; }
        let saveObj = {
            name: this.registerForm.value.name,
            rank: this.registerForm.value.rank,
            flag: this.imagePath
        }
        let response = await this.apiService.saveCountry(saveObj)
        if (response['status']) {
            this.submitted = false
            this.imageName = "Choose flag"
            this.registerForm.reset()
        }
    }
}
