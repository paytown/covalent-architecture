import React, { Component } from 'react';

import api from '../../../services/dropbox/api';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import './Projects.scss';

export default class Projects extends Component {
  state = {
    imageLinks: [],
    categories: [],
    projects: [''],
    activeCategory: '',
  }

  componentDidMount() {
    const activeCategory = window.location.search.slice(1);
    this.setState({ activeCategory });
    this.retrieveCategories();
    this.retrieveProjects({ target: { value: activeCategory } });
  }

  retrieveCategories = async () => {
    const categories = await api.getCategories();
    this.setState({ categories });
  }

  retrieveProjects = async e => {
    const category = e.target.value;
    const projects = await api.getProjects(category);
    this.setState({ projects, activeCategory: category });
    this.retrieveImageLinks({ target: { value: projects[0] } });
  }

  retrieveImageLinks = async e => {
    this.setState({ imageLinks: [] });
    const project = e.target.value;
    const { activeCategory } = this.state;
    const imageLinks = await api.getImageLinks(activeCategory, project);
    this.setState({ imageLinks });
  }

  render() {
    const { retrieveProjects, retrieveImageLinks } = this;
    const { categories, projects, imageLinks, activeCategory } = this.state;

    return (
      <article className="projects">
        <select
          onChange={retrieveProjects}
          value={activeCategory}
        >
          {categories.length && categories.map(categoryObject => {
            const { category } = categoryObject;
            return <option
              key={category}
              value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>;
          })}
        </select>
        <section className="carousel-container">
          <Carousel>
            {imageLinks.length && imageLinks.map(imageLink => {
              return <div key={imageLink}>
                <img src={imageLink} />
                <p className="legend">Legend 1</p>
              </div>;
            })}
          </Carousel>
        </section>
        <select onChange={retrieveImageLinks}>
          {projects.map(project => {
            return <option
              key={project}
              value={project}>
              {project.charAt(0).toUpperCase() + project.slice(1)}
            </option>;
          })}
        </select>
      </article>
    );
  }
}
