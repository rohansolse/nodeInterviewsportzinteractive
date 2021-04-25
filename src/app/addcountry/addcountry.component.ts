import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    imageError: string = null;
    imagePath: string = null;
    rankExisted: string = null;
    successMsg: boolean = false
    imageName: string = "Choose File"

    constructor(private formBuilder: FormBuilder,
        private apiService: CountriesServiceService,
        private router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), Validators.minLength(3), Validators.maxLength(20)]],
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
                this.imageError = null
            }
            else if (!response['status']) {
                this.imageError = response['message']
            }
        }
    }

    async checkImamgeRank(event) {
        let rank = Number(event.target.value)
        // console.log(rank);
        if (rank > 0) {
            let response = await this.apiService.checkExistingRank(rank)
            if (response['status']) {
                this.rankExisted = "This Rank is Already Existed"
            }
            else { this.rankExisted = null }
        }
        else if (rank < 0) {
            this.rankExisted = "Only Positive numbers allowed!"
        }
        else { this.rankExisted = null }
    }

    async onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) { return; }
        let saveObj = {
            name: this.registerForm.value.name,
            rank: this.registerForm.value.rank,
            flag: this.imagePath
        }
        if (this.registerForm.valid && !this.rankExisted && !this.imageError) {
            let response = await this.apiService.saveCountry(saveObj)
            if (response['status']) {
                this.submitted = false
                this.imageName = "Choose File"
                this.registerForm.reset()
                this.successMsg = true
                // I have set this timeout coz after saving file app is taking time to restart
                setTimeout(() => { this.router.navigate(["/countries"]) }, 1000);
            }
        }
    }
}
