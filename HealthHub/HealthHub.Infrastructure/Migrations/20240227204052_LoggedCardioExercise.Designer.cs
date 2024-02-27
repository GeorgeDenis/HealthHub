﻿// <auto-generated />
using System;
using HealthHub.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HealthHub.Infrastructure.Migrations
{
    [DbContext(typeof(HealthHubContext))]
    [Migration("20240227204052_LoggedCardioExercise")]
    partial class LoggedCardioExercise
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("HealthHub.Domain.Entities.LoggedCardioExercise", b =>
                {
                    b.Property<Guid>("LoggedCardioExerciseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("CaloriesBurned")
                        .HasColumnType("integer");

                    b.Property<DateTime>("DateLogged")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Duration")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("LoggedCardioExerciseId");

                    b.ToTable("LoggedCardioExercises");
                });

            modelBuilder.Entity("HealthHub.Domain.Entities.LoggedFood", b =>
                {
                    b.Property<Guid>("LoggedFoodId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Calories")
                        .HasColumnType("integer");

                    b.Property<int>("Carbohydrates")
                        .HasColumnType("integer");

                    b.Property<DateTime>("DateLogged")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Fat")
                        .HasColumnType("integer");

                    b.Property<int>("MealType")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<float?>("NumberOfServings")
                        .HasColumnType("real");

                    b.Property<int>("Protein")
                        .HasColumnType("integer");

                    b.Property<float?>("ServingSize")
                        .HasColumnType("real");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("LoggedFoodId");

                    b.ToTable("LoggedFoods");
                });

            modelBuilder.Entity("HealthHub.Domain.Entities.LoggedStrengthExercise", b =>
                {
                    b.Property<Guid>("LoggedStrengthExerciseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("DateLogged")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("MuscleGroup")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("NumberOfSets")
                        .HasColumnType("integer");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.Property<int>("WeightPerSet")
                        .HasColumnType("integer");

                    b.HasKey("LoggedStrengthExerciseId");

                    b.ToTable("LoggedStrengthExercises");
                });

            modelBuilder.Entity("HealthHub.Domain.Entities.MacronutrientsGoal", b =>
                {
                    b.Property<Guid>("MacronutrientsGoalId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("CarbohydratesPercent")
                        .HasColumnType("integer");

                    b.Property<int>("FatsPercent")
                        .HasColumnType("integer");

                    b.Property<int>("ProteinPercent")
                        .HasColumnType("integer");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("MacronutrientsGoalId");

                    b.ToTable("MacronutrientsGoals");
                });

            modelBuilder.Entity("HealthHub.Domain.Entities.PasswordResetCode", b =>
                {
                    b.Property<Guid>("PasswordResetCodeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("ExpirationTime")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("PasswordResetCodeId");

                    b.ToTable("PasswordResetCodes");
                });

            modelBuilder.Entity("HealthHub.Domain.Entities.User", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
