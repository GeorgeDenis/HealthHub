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
    [Migration("20240616155136_AIConversationChatFix")]
    partial class AIConversationChatFix
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("HealthHub.Domain.Entities.AIChat", b =>
                {
                    b.Property<Guid>("AiChatId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("AiConversationId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("DateSent")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("AiChatId");

                    b.ToTable("AIChat");
                });

            modelBuilder.Entity("HealthHub.Domain.Entities.AIConversation", b =>
                {
                    b.Property<Guid>("AIConversationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("DateSent")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("AIConversationId");

                    b.ToTable("AIConversation");
                });

            modelBuilder.Entity("HealthHub.Domain.Entities.Badge", b =>
                {
                    b.Property<Guid>("BadgeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("Active")
                        .HasColumnType("boolean");

                    b.Property<int>("Count")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("BadgeId");

                    b.ToTable("Badges");
                });

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

            modelBuilder.Entity("HealthHub.Domain.Entities.LoggedMeasurements", b =>
                {
                    b.Property<Guid>("LoggedMeasurementsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("DateLogged")
                        .HasColumnType("timestamp with time zone");

                    b.Property<float?>("HipCircumference")
                        .HasColumnType("real");

                    b.Property<float?>("NeckCircumference")
                        .HasColumnType("real");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.Property<float?>("WaistCircumference")
                        .HasColumnType("real");

                    b.Property<float?>("Weight")
                        .HasColumnType("real");

                    b.Property<string>("WeightPhotoUrl")
                        .HasColumnType("text");

                    b.HasKey("LoggedMeasurementsId");

                    b.ToTable("LoggedMeasurements");
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

                    b.Property<string>("WeightPerSet")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoggedStrengthExerciseId");

                    b.ToTable("LoggedStrengthExercises");
                });

            modelBuilder.Entity("HealthHub.Domain.Entities.LoggedWater", b =>
                {
                    b.Property<Guid>("LoggedWaterId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<float>("Amount")
                        .HasColumnType("real");

                    b.Property<DateTime>("DateLogged")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("LoggedWaterId");

                    b.ToTable("LoggedWater");
                });

            modelBuilder.Entity("HealthHub.Domain.Entities.LoggedWeight", b =>
                {
                    b.Property<Guid>("LoggedWeightId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("DateLogged")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.Property<float>("Weight")
                        .HasColumnType("real");

                    b.HasKey("LoggedWeightId");

                    b.ToTable("LoggedWeights");
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

            modelBuilder.Entity("HealthHub.Domain.Entities.Message", b =>
                {
                    b.Property<Guid>("MessageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("DateSent")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("Receiver")
                        .HasColumnType("uuid");

                    b.Property<Guid>("Sender")
                        .HasColumnType("uuid");

                    b.HasKey("MessageId");

                    b.ToTable("Messages");
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

            modelBuilder.Entity("HealthHub.Domain.Entities.RecipeComment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("RecipeId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.ToTable("RecipeComments");
                });

            modelBuilder.Entity("HealthHub.Domain.Entities.User", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("HealthHub.Domain.Entities.UserVotedBadges", b =>
                {
                    b.Property<Guid>("UserVotedBadgesId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("VotedId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("VoterId")
                        .HasColumnType("uuid");

                    b.HasKey("UserVotedBadgesId");

                    b.ToTable("UserVotedBadges");
                });
#pragma warning restore 612, 618
        }
    }
}