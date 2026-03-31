import { Component, inject, computed, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../core/services/modal.service';
import { AgePipe } from '../../core/pipes/age.pipe';

@Component({
  selector: 'app-about-modal',
  standalone: true,
  imports: [CommonModule, AgePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="lightbox-wrapper" id="about" [class.modal-open]="isActive()">
      <div class="lightbox-close">
        <div class="close-btn" (click)="close()" aria-label="Close About"></div>
      </div>

      <div class="container lightbox-content">
        <!-- Section Heading -->
        <div class="section-heading page-heading single-section">
          <p class="section-description">Get to know me</p>
          <h2 class="section-title">About Me</h2>
          <div class="animated-bar"></div>
        </div>

        <!-- Info Section -->
        <div class="single-section info-section">
          <div class="row align-items-center">
            <div class="col-12 col-lg-5 info-img">
              <img class="img-fluid img-thumbnail"
                   src="img/winery.jpeg"
                   alt="Kelvin Mundi at a winery"
                   loading="lazy">
            </div>
            <div class="col-12 col-lg-7 info-content">
              <h2 class="content-subtitle">Who am I?</h2>
              <h3 class="content-title">Senior Frontend Engineer specializing in Angular.</h3>
              <div class="content-description">
                <p>Senior Frontend Engineer specializing in Angular and enterprise financial applications.
                   I architect and deliver clean, maintainable code in fast-paced, client-facing environments —
                   guiding implementations from conception through production deployment.</p>
                <p>Based in Atlanta, GA, originally from Nairobi, Kenya (where the sun shines all year long!).
                   Passionate about Angular modernization, performance optimization, and AI-assisted development.</p>
              </div>

              <address class="content-info">
                <div class="row">
                  <div class="col-12 col-md-6 single-info">
                    <span>Name:</span><p>Kelvin Mundi</p>
                  </div>
                  <div class="col-12 col-md-6 single-info">
                    <span>Email:</span>
                    <p><a href="mailto:kevkmundy@gmail.com">kevkmundy&#64;gmail.com</a></p>
                  </div>
                  <div class="col-12 col-md-6 single-info">
                    <span>Age:</span><p>{{ '1993/12/18' | age }}</p>
                  </div>
                  <div class="col-12 col-md-6 single-info">
                    <span>Location:</span><p>Atlanta, GA, USA</p>
                  </div>
                </div>
              </address>

              <div class="d-flex align-items-center flex-wrap gap-3">
                <a href="assets/kelvin-mundi-resume.docx" download class="btn button-main button-scheme content-download" aria-label="Download Resume">
                  Download Resume
                </a>
                <ul class="content-follow list-unstyled">
                  <li>
                    <a href="https://www.linkedin.com/in/kelvin-mundi" target="_blank" rel="noopener" aria-label="LinkedIn">
                      <i class="icon ion-logo-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/mundy-kelvin" target="_blank" rel="noopener" aria-label="GitHub">
                      <i class="icon ion-logo-github"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Services Section -->
        <div class="single-section services-section">
          <div class="section-heading">
            <p class="section-description">What I do</p>
            <h3 class="section-title">My Services</h3>
          </div>
          <div class="row">
            @for (service of services; track service.title) {
              <div class="col-12 col-md-6 col-lg-4">
                <div class="single-service">
                  <i class="icon service-icon" [class]="service.icon" aria-hidden="true"></i>
                  <h6 class="service-title">{{ service.title }}</h6>
                  <p class="service-description">{{ service.description }}</p>
                </div>
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  `
})
export class AboutModal {
  private modalService = inject(ModalService);
  isActive = computed(() => this.modalService.activeModal() === 'about');

  close(): void { this.modalService.close(); }

  services = [
    {
      title: 'Web Development',
      icon: 'ion-logo-html5',
      description: 'Building scalable web applications with Angular, React, and TypeScript.'
    },
    {
      title: 'Mobile Apps',
      icon: 'ion-ios-phone-portrait',
      description: 'Cross-platform mobile solutions with responsive and accessible design.'
    },
    {
      title: 'Cloud Native',
      icon: 'ion-ios-cloud-outline',
      description: 'Microservices, CI/CD pipelines, Docker, and cloud-first architectures.'
    }
  ];
}
