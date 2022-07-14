import {Component, ElementRef, EventEmitter, HostListener, Output, ViewChild} from '@angular/core';
import {CountryModel} from '../../models/country.model';

@Component({
    selector: 'app-country-search',
    templateUrl: './country-search.component.html',
    styleUrls: ['./country-search.component.css']
})
export class CountrySearchComponent{

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

    isFilteredCountriesShown = false;

    filteredCountries: CountryModel[] = this.countries;

    listCountries(text: string, event: KeyboardEvent) {
        if (event.key === 'Escape') { return; }
        this.updateFilteredCountry(text);
        if (this.filteredCountries.length === 1) this.countryCodeUpdate.emit(this.filteredCountries[0].shortName);
    }

    selectCountry(country: CountryModel) {
        this.countryInput.nativeElement.value = country.name;
        this.updateFilteredCountry(country.name);
        console.log(this.filteredCountries)
        this.countryCodeUpdate.emit(country.shortName);
        this.isFilteredCountriesShown = false;
    }

    updateFilteredCountry(countryName: string) {
        countryName = countryName.toLowerCase();
        this.filteredCountries = this.countries.filter((country: CountryModel) => country.name.toLowerCase().includes(countryName));
    }
}
