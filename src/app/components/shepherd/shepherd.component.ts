import {AfterViewInit, Component} from '@angular/core';
import {ShepherdService} from "angular-shepherd";
import {resolve} from "@angular/compiler-cli";
import Step from 'shepherd.js/src/types/step';

const defaultOptions = {
  scrollTo: true,
  canClickTarget: true,
  popperOptions: {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 20]
        }
      }
    ]
  },
  modalOverlayOpeningPadding: 8,
  modalOverlayOpeningRadius: 4,
  confirmCancel: true,
}


const steps: Step.StepOptions[] = [
  {
    title: 'Can Login',
    text: 'The first step of the tour, is logging in to the application. or explore more',
    attachTo: {
      element: '.btn-login',
      on: 'bottom',
    },
    when: {
      show: () => {
        console.log('step 1 is showing');
      },
      hide: () => {
        console.log('step 1 is hidden');
      }
    },
    advanceOn: {
      selector: '.title-my-services',
      event: 'click'
    }
  },
  {
    title: 'My Services',
    text: 'Welcome to the next step of the tour, this is the My Services section.',
    attachTo: {
      element: '.title-my-services',
      on: 'top',
    },
    when: {
      show: () => {
        console.log('step 2 is showing');
      },
      hide: () => {
        console.log('step 2 is hidden');
      }
    },
    advanceOn: {
      selector: '.card-free',
      event: 'click'
    }
  },
  {
    title: 'Is Free',
    text: 'One of my service is free',
    attachTo: {
      element: '.card-free',
      on: 'top-end',
    },
    advanceOn: {
      selector: '.card-contributory',
      event: 'click'
    }
  },
  {
    title: 'Is Contributory',
    text: 'One of my service is contributory',
    attachTo: {
      element: '.card-contributory',
      on: 'top-end',
    },
    advanceOn: {
      selector: '.card-open-source',
      event: 'click'
    }
  },
  {
    title: 'Is Open Source',
    text: 'One of my service is open source',
    attachTo: {
      element: '.card-open-source',
      on: 'top-end',
    },
  }
]

;

@Component({
  selector: 'app-shepherd',
  templateUrl: './shepherd.component.html',
  styleUrls: ['./shepherd.component.css']
})
export class ShepherdComponent {
  constructor(private shepherdService: ShepherdService) {}

  startTour() {
    this.shepherdService.defaultStepOptions = defaultOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = true;
    const lengthOfSteps = steps.length;
    console.log('lengthOfSteps', lengthOfSteps)
    this.shepherdService.addSteps(
      steps.map((step, index) => {
      if(lengthOfSteps - 1 == index) {
        return {
          ...step,
          buttons: step.buttons = [
            {
              text: 'Previous',
              classes: 'shepherd-button-example-secondary',
              action: () => { this.shepherdService.back() }
            },
            {
              text: 'Finish',
              classes: 'shepherd-button-example-primary',
              action: () => { this.shepherdService.next() }
            },
          ]
        }
      }
      return {
        ...step,
        buttons: step.buttons = [
          {
            text: 'Previous',
            classes: 'shepherd-button-example-secondary',
            action: () => { this.shepherdService.back() }
          },
          {
            text: 'Next',
            classes: 'shepherd-button-primary',
            action: () => { this.shepherdService.next() }
          },
          {
            text: 'Cancel',
            classes: 'shepherd-button-secondary',
            action: () => { this.shepherdService.cancel() }
          }
        ]
      }
    }));
    this.shepherdService.start();
  }
}
