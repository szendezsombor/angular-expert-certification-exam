import {Component, ElementRef, EventEmitter, HostListener, Output, ViewChild} from '@angular/core';
import {CountryModel} from '../../models/country.model';

@Component({
    selector: 'app-country-search',
    templateUrl: './country-search.component.html',
    styleUrls: ['./country-search.component.css']
})
export class CountrySearchComponent {

    @Output() countryCodeUpdate: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('country') countryInput: ElementRef<HTMLInputElement>;

    countries: CountryModel[] = [
        {
            name: 'USA',
            shortName: 'US',
        },
        {
            name: 'France',
            shortName: 'FR',
        },
        {
            name: 'Australia',
            shortName: 'AU'
        },
        {
            name: 'Hungary',
            shortName: 'HU',
        },

    ];

    filteredCountries: CountryModel[] = [];

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(_event: KeyboardEvent) {
        this.filteredCountries = [];
    }

    listCountries(text: string, event: KeyboardEvent) {
        if (event.key === 'Escape') return;
        text = text.toLowerCase();
        this.filteredCountries = this.countries.filter((country: CountryModel) => country.name.toLowerCase().includes(text));
    }

    selectCountry(country: CountryModel) {
        this.countryInput.nativeElement.value = country.name;
        this.countryCodeUpdate.emit(country.shortName);
        this.filteredCountries = [];
    }
}
